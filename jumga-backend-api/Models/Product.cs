using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class Product
	{
		public int Id { get; set; }
		public string ProductName { get; set; }
		public string ProductImage { get; set; }
		public double ProductPrice { get; set; }
		public int ProductUnit { get; set; }
		public int ShopId { get; set; }
		public double DeliveryFee { get; set; }
	}
}
