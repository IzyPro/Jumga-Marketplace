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
	[Route("api/auth")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IUserService _userService;
		private readonly IShopService _shopService;

		public AuthController(IUserService userService, IShopService shopService)
		{
			_userService = userService;
			_shopService = shopService;
		}

		//POST api/auth/login
		[HttpPost("login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] LoginModel model)
		{
			IActionResult response = Unauthorized("Incorrect Username or password");
			var user = await _userService.Authenticate(model.Email, model.Password);
			if (user != null)
			{
				var tokenString = _userService.GenerateToken(user);
				response = Ok(new
				{
					token = tokenString,
					userDetails = new User
					{
						Id = user.Id,
						FirstName = user.FirstName,
						LastName = user.LastName,
						Email = user.Email,
						UserName = user.UserName,
						UserRole = user.UserRole,
						UserShop = user.UserShop
					}
				});

			}

			return response;
		}

		//POST api/auth/register
		[HttpPost("register")]
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] RegisterModel model)
		{
			string mySalt = BCrypt.Net.BCrypt.GenerateSalt();
			var user = new User
			{
				FirstName = model.FirstName,
				LastName = model.LastName,
				Email = model.Email,
				UserName = model.UserName,
				Password = BCrypt.Net.BCrypt.HashPassword(model.Password, mySalt),
				UserRole = "User"
			};

			var userExist = _userService.IsUserExist(model.Email);
			if (userExist)
				return BadRequest("An account with this email already exist");

			var userNameExist = _userService.IsUserNameExist(model.UserName);
			if (userNameExist)
				return BadRequest("An account with this username already exist");

			var response = await _userService.Register(user);
			var isRegistered = _userService.SaveChanges();
			var createdShop = new Shop();
			if (isRegistered)
			{
				var shop = new Shop
				{
					ShopName = model.ShopName,
					ShopEmail = model.ShopEmail,
					ShopNumber = model.ShopPhoneNumber,
					UserId = user.Id,
					Description = model.ShopDescription,
					Country = model.Country,
					IsApproved = false
				};
				var newShop = await _shopService.AddShop(shop);
				createdShop = newShop;
				var isShopCreated = _shopService.SaveChanges();
				if (!isShopCreated)
				{
					return BadRequest(new { message = "could not register" });
				};
			}
			else
			{
				return BadRequest(new { message = "could not register" });
			}
			return Ok(new
			{
				userDetails = new User
				{
					Id = response.Id,
					FirstName = response.FirstName,
					LastName = response.LastName,
					Email = response.Email,
					UserName = response.UserName,
					UserRole = response.UserRole,
					UserShop = createdShop
				}
			});

		}
	}
}
