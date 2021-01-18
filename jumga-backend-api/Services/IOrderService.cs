using JumgaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public interface IOrderService
	{
		Task<IEnumerable<Order>> GetAllOrders();
		Task<IEnumerable<Order>> GetShopOrders(int shopId);
		Task<Order> GetOrderById(int Id);
		Task<Order> AddOrder(Order order);
		bool SaveChanges();
	}
}
