using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class FlutterwaveSubaccountRequestModel
	{

		public string account_bank { get; set; }
		public string account_number { get; set; }
		public string business_name { get; set; }
		public string business_email { get; set; }
		public string business_mobile { get; set; }
		public string country { get; set; }
		public string split_type { get; set; }
		public double split_value { get; set; }

	}
}
