using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Models
{
	public class FlutterwaveVerificationModel
	{
		public string transactionId { get; set; }
		public string currency { get; set; }
		public double amount { get; set; }
		public string account_bank { get; set; }
		public string account_number { get; set; }
	}
}
