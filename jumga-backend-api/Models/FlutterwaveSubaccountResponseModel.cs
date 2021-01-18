using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class FlutterwaveSubaccountResponseModel
	{
		public string status { get; set; }
		public string message { get; set; }
		public Data data { get; set; }

		public class Data
		{
			public int id { get; set; }
			public string account_number { get; set; }
			public string account_bank { get; set; }
			public string full_name { get; set; }
			public DateTime created_at { get; set; }
			public string split_type { get; set; }
			public float split_value { get; set; }
			public string subaccount_id { get; set; }
			public string bank_name { get; set; }
		}

	}
}
