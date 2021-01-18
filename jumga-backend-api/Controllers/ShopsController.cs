using JumgaAPI.Models;
using JumgaAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Controllers
{
	[Route("api/shops")]
	[ApiController]
	public class ShopsController : ControllerBase
	{
		private readonly IShopService _shopServices;
		private readonly IFlutterwaveService _flutterwaveService;
		private readonly IOrderService _orderService;
		private readonly IUserService _userService;

		public ShopsController(IShopService shopService, IFlutterwaveService flutterwaveService, IOrderService orderService, IUserService userService)
		{
			_shopServices = shopService;
			_flutterwaveService = flutterwaveService;
			_orderService = orderService;
			_userService = userService;
		}

		//GET api/shops/
		[HttpGet]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> GetAllShops()
		{
			var shops = await _shopServices.GetShops();
			return Ok(shops);
		}

		//GET api/shops/2
		[HttpGet("{id}")]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> GetShopById(int id)
		{
			var shop = await _shopServices.GetShopById(id);
			if (shop != null)
			{
				return Ok(shop);
			}
			else
			{
				return BadRequest("No shop found");
			}
		}

		//GET api/shops/user/2
		[HttpGet("user/{id}")]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> GetShopByUserId(int id)
		{
			var shop = await _shopServices.GetShopByUserId(id);
			if(shop != null)
			{
				return Ok(shop);
			}
			else
			{
				return BadRequest("No shop found");
			}
			
		}

		//GET api/shops/kelechi
		[HttpGet("name/{username}")]
		[AllowAnonymous]
		public async Task<IActionResult> GetShopByUserName(string username)
		{
			var user = await _userService.GetUserByUsername(username);
			if(user == null)
			{
				return BadRequest("User not found");
			}
			else
			{
				var shop = await _shopServices.GetShopByUserId(user.Id);
				if (shop != null)
				{
					return Ok(shop);
				}
				else
				{
					return BadRequest("No shop found");
				}
			}
			
		}

		//GET api/shops/3/order
		[HttpGet("{id}/order")]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> GetShopOrders(int id)
		{
			var order = await _orderService.GetShopOrders(id);
			if(order != null)
			{
				return Ok(order);
			}
			else
			{
				return BadRequest("No order found");
			}
		}

		//POST api/shops/make-order
		[HttpPost("make-order")]
		[AllowAnonymous]
		public async Task<IActionResult> MakeOrder([FromBody] PlaceOrderModel model)
		{
			var order = new Order
			{
				ShopId = model.ShopId,
				CustomerDeliveryAddress = model.CustomerDeliveryAddress,
				CustomerEmailAddress = model.CustomerEmailAddress,
				CustomerName = model.CustomerName,
				CustomerPhoneNumber = model.CustomerPhoneNumber,
				OrderItems = model.OrderItems,
				SubTotalDeliveryCost = model.SubTotalDeliveryCost,
				SubTotalItemCost = model.SubTotalItemCost,
				Total = model.Total
			};
			var (error, isVerified) = await _flutterwaveService.FlutterwaveVerify(model.transactionId, model.currency, model.amount);
			if (isVerified)
			{
				var request = await _orderService.AddOrder(order);
				var isAdded = _orderService.SaveChanges();
				if (isAdded)
				{
					return Ok(request);
				}
				else
				{
					return BadRequest("Couldnt not place order");
				}
			}
			else
			{
				return BadRequest(error);
			}
			

		}

		//GET api/shops/order/3
		[HttpGet("order/{id}")]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> GetOrderById(int id)
		{
			var order = await _orderService.GetOrderById(id);
			if (order != null)
			{
				return Ok(order);
			}
			else
			{
				return BadRequest("No order found");
			}
		}

		//PUT api/shops/approve-shop/2
		[HttpPut("approve-shopwave/{id}")]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> ApproveShopWave(int id, [FromBody] FlutterwaveVerificationModel model)
		{
			IActionResult response = BadRequest();
			var shop = await _shopServices.GetShopById(id);
			if (shop == null)
			{
				response = BadRequest("No such shop");
			}else if (shop.IsApproved == true)
			{
				response = BadRequest("Shop is already approved");
			}
			else
			{
				var (error, isVerified) = await _flutterwaveService.FlutterwaveVerify(model.transactionId, model.currency, model.amount);
				if (isVerified)
				{
					var requestModel = new FlutterwaveSubaccountRequestModel
					{
						account_bank = model.account_bank,
						account_number = model.account_number,
						business_email = shop.ShopEmail,
						business_mobile = shop.ShopNumber,
						business_name = shop.ShopName,
						country = shop.Country,
						split_type = "percentage",
						split_value = 0.025
					};
					var (data, statusCode) = await _flutterwaveService.FlutterwaveCreateSubaccount(requestModel);
					if (statusCode == 200)
					{
						if(data != null)
						{
							var newShop = await _shopServices.ActivateShop(id, data.data.subaccount_id, data.data.id);
							response = Ok(newShop);
						}
					}
					else
					{
						return BadRequest(data.message);
					}

				}
				else
				{
					response = BadRequest(error);
				}
			}
			return response;
		}
	}
}
