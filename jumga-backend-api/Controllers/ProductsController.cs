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
	[Route("api/[controller]")]
	public class ProductsController : ControllerBase
	{
		private readonly IProductService _productService;

		public ProductsController(IProductService productService)
		{
			_productService = productService;
		}

		[HttpPost("add-product")]
		[Authorize(Policy = Policies.User)]
		public async Task<IActionResult> AddProduct([FromBody]ProductModel model)
		{
			var productModel = new Product {
				ProductName = model.ProductName,
				DeliveryFee = model.DeliveryFee,
				ProductImage = model.ProductImage,
				ProductPrice = model.ProductPrice,
				ProductUnit = model.ProductUnit,
				ShopId = model.ShopId
			};
			var product = await _productService.AddProduct(productModel);
			var isAdded = _productService.SaveChanges();
			if (isAdded)
			{
				return Ok(product);
			}
			else
			{
				return BadRequest("Couldnt Add Product");
			}
		}
	}
}
