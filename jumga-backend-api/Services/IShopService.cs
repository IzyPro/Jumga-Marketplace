using JumgaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public interface IShopService
	{
		bool SaveChanges();

		Task<IEnumerable<Shop>> GetShops();
		Task<Shop> AddShop(Shop shop);

		Task<Shop> GetShopById(int shopId);
		Task<Shop> GetShopByUserId(int userId);

		Task<Shop> ActivateShop(int shopId, string subaccountId, int merchId);

		Task<Shop> AssignRider(Shop shop);
	}
}
