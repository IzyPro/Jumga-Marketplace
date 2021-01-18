using JumgaAPI.Data;
using JumgaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public class ShopService : IShopService
	{
		private readonly JumgaContext _context;
		private readonly IUserService _userService;

		public ShopService(JumgaContext context, IUserService userService)
		{
			_context = context;
			_userService = userService;
		}

		public async Task<Shop> ActivateShop(int shopId, string subaccountId, int merchId)
		{
			var shop = await GetShopById(shopId);
			shop.SubAccountId = subaccountId;
			shop.MerchId = merchId;
			shop.IsApproved = true;
			Random rand = new Random();
			int ridersCount = await _context.Riders.CountAsync();
			int toSkip = rand.Next(1, ridersCount);
			var rider = await _context.Riders.Skip(toSkip - 1).Take(1).FirstOrDefaultAsync();
			shop.DispatchRider = rider;
			shop.RiderId = rider.Id;
			_context.Update(shop);
			_context.SaveChanges();

			return shop;

		}

		public async Task<Shop> AddShop(Shop shop)
		{
			if (shop == null)
			{
				throw new ArgumentNullException(nameof(shop));
			}
			await _context.Shops.AddAsync(shop);
			return shop;
		}

		public async Task<Shop> AssignRider(Shop shop)
		{
			Random rand = new Random();
			int ridersCount = await _context.Riders.CountAsync();
			int toSkip = rand.Next(1, ridersCount);
			var rider = await _context.Riders.Skip(toSkip).Take(1).FirstOrDefaultAsync();
			shop.DispatchRider = rider;
			shop.RiderId = rider.Id;
			_context.Update(shop);
			_context.SaveChanges();
			return shop;
		}

		public async Task<Shop> GetShopById(int shopId)
		{
			return await _context.Shops
				.Include(r => r.DispatchRider)
				.Include(p => p.Products)
				.Include(o => o.Orders)
					.ThenInclude(i => i.OrderItems)
				.AsNoTracking()
				.FirstOrDefaultAsync(s => s.Id == shopId);
		}

		public async Task<Shop> GetShopByUserId(int userId)
		{
			return await _context.Shops
				.Include(r => r.DispatchRider)
				.Include(p => p.Products)
				.Include(o => o.Orders)
					.ThenInclude(i => i.OrderItems)
				.AsNoTracking()
				.FirstOrDefaultAsync(s => s.UserId == userId);
		}

		public async Task<IEnumerable<Shop>> GetShops()
		{
			return await _context.Shops
				.Include(r => r.DispatchRider)
				.Include(p => p.Products)
				.Include(o => o.Orders)
					.ThenInclude(i => i.OrderItems)
				.AsNoTracking()
				.ToListAsync();
		}

		public bool SaveChanges()
		{
			return (_context.SaveChanges() >= 0);
		}
	}
}
