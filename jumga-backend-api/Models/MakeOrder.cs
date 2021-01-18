using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class MakeOrder
	{
		public int ShopId { get; set; }
		public virtual ICollection<Item> OrderItems { get; set; }
		public double Total { get; set; }
	}
}
