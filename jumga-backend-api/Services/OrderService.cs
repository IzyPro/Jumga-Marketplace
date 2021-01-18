using JumgaAPI.Data;
using JumgaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public class OrderService : IOrderService
	{
		private readonly JumgaContext _context;
		private readonly IProductService _productService;
		private readonly IShopService _shopService;

		public OrderService(JumgaContext context, IProductService productService, IShopService shopService)
		{
			_context = context;
			_productService = productService;
			_shopService = shopService;
		}

		public async Task<Order> AddOrder(Order order)
		{
			foreach(var order_item in order.OrderItems)
			{
				var product = await _productService.GetProductById(order_item.ProductId);
				product.ProductUnit = product.ProductUnit - order_item.ProductUnit;
				_context.Update(product);
			}
			await _context.Items.AddRangeAsync(order.OrderItems);
			await _context.Orders.AddAsync(order);
			var shop = await _shopService.GetShopById(order.ShopId);
			shop.Balance += order.SubTotalItemCost;
			shop.DispatchRider.Balance += order.SubTotalDeliveryCost;
			_context.Update(shop);
			_context.SaveChanges();
			return order;
		}

		public async Task<IEnumerable<Order>> GetAllOrders()
		{
			return await _context.Orders.ToListAsync();
		}

		public async Task<Order> GetOrderById(int Id)
		{
			return await _context.Orders.FirstOrDefaultAsync(o => o.Id == Id);
		}

		public async Task<IEnumerable<Order>> GetShopOrders(int shopId)
		{
			var orders = await _context.Orders.ToListAsync();
			return orders.Where(o => o.ShopId == shopId);
		}

		public bool SaveChanges()
		{
			return (_context.SaveChanges() >= 0);
		}
	}
}
