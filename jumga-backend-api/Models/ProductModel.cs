using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class ProductModel
	{
		[Required]
		public string ProductName { get; set; }
		[Required]
		public double ProductPrice { get; set; }
		[Required]
		public string ProductImage { get; set; }
		[Required]
		public int ProductUnit { get; set; }
		[Required]
		public int ShopId { get; set; }
		[Required]
		public double DeliveryFee { get; set; }
	}
}
