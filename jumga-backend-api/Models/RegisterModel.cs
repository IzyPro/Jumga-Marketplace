using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class RegisterModel
	{

		[Required]
		public string FirstName { get; set; }
		[Required]
		public string LastName { get; set; }
		[Required]
		public string Email { get; set; }
		[Required]
		public string UserName { get; set; }
		[Required]
		public string Password { get; set; }
		[Required]
		public string ShopName { get; set; }
		[Required]
		public string ShopDescription { get; set; }
		[Required]
		public string ShopPhoneNumber { get; set; }
		[Required]
		public string ShopEmail { get; set; }
		[Required]
		public string Country { get; set; }
	}
}
