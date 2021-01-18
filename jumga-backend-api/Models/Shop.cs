using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class Shop
	{
		public int Id { get; set; }
		public string ShopName { get; set; }
		public string ShopEmail { get; set; }
		public string ShopNumber { get; set; }
		public string Description { get; set; }
		public double Balance { get; set; }
		public int UserId { get; set; }
		public bool IsApproved { get; set; }
		public int? MerchId { get; set; }
		public string SubAccountId { get; set; }
		public string Country { get; set; }
		public int? RiderId { get; set; }
		public Rider DispatchRider { get; set; }
		public virtual ICollection<Product> Products { get; set; }
		public virtual ICollection<Order> Orders { get; set; }

	}
}
