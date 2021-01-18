using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class Rider
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string SubAccountId { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public double Balance { get; set; }
		public string LastName { get; set; }
		public bool isAvailable { get; set; }
	}
}
