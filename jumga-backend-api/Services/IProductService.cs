using JumgaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public interface IProductService
	{
		bool SaveChanges();
		Task<Product> AddProduct(Product product);
		Task<IEnumerable<Product>> GetAllProducts();
		Task<IEnumerable<Product>> GetProductsByUserId(int userId);
		Task<IEnumerable<Product>> GetProductsByShopId(int shopId);
		Task<Product> GetProductById(int id);
	}
}
