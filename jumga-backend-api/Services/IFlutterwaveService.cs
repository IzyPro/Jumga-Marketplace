using JumgaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public interface IFlutterwaveService
	{
		public Task<Tuple<string, bool>> FlutterwaveVerify(string transactionId, string currency, double amount);
		public Task<Tuple<FlutterwaveSubaccountResponseModel, int>> FlutterwaveCreateSubaccount(FlutterwaveSubaccountRequestModel model);
	}
}
