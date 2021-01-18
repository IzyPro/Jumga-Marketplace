using JumgaAPI.Data;
using JumgaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public class ProductService :  IProductService
	{
		private readonly JumgaContext _context;
		private readonly IUserService _userService;

		public ProductService(JumgaContext context, IUserService userService)
		{
			_context = context;
			_userService = userService;
		}

		public async Task<Product> AddProduct(Product product)
		{
			if (product == null)
			{
				throw new ArgumentNullException(nameof(product));
			}
			await _context.Products.AddAsync(product);
			return product;
		}

		public async Task<IEnumerable<Product>> GetAllProducts()
		{
			return await _context.Products.ToListAsync();
		}

		public async Task<Product> GetProductById(int id)
		{
			return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
		}

		public async Task<IEnumerable<Product>> GetProductsByShopId(int shopId)
		{
			var req = await _context.Products.ToListAsync();
			return req.Where(p => p.ShopId == shopId);
		}

		public async Task<IEnumerable<Product>> GetProductsByUserId(int userId)
		{
			var user = await _userService.GetUserById(userId);
			return user.UserShop.Products.ToList();
		}

		public bool SaveChanges()
		{
			return (_context.SaveChanges() >= 0);
		}
	}
}
