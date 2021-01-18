using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class PlaceOrderModel
	{
		public string transactionId { get; set; }
		public string currency { get; set; }
		public double amount { get; set; }
		public int ShopId { get; set; }
		public string CustomerName { get; set; }
		public string CustomerEmailAddress { get; set; }
		public string CustomerPhoneNumber { get; set; }
		public string CustomerDeliveryAddress { get; set; }
		public virtual ICollection<Item> OrderItems { get; set; }
		public double SubTotalItemCost { get; set; }
		public double SubTotalDeliveryCost { get; set; }
		public double Total { get; set; }
	}
}
