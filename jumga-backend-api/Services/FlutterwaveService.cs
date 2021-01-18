using JumgaAPI.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public class FlutterwaveService : IFlutterwaveService
	{
		private readonly IShopService _shopService;

		public FlutterwaveService(IShopService shopService)
		{
			_shopService = shopService;
		}
		public async Task<Tuple<string, bool>> FlutterwaveVerify(string transactionId, string currency, double amount)
		{
            try
            {
				string error = "";
                var client = new RestClient(AppConfig.FlutterwaveBaseURL);
                var request = new RestRequest("transactions/" + transactionId + "/verify", Method.GET);
                request.AddHeader("Authorization", "Bearer " + AppConfig.FlutterwaveSecKey);
                var response = await client.ExecuteAsync<FlutterwaveVerificationResponse>(request);
				error = response.Data.message;
				if (response.StatusCode == System.Net.HttpStatusCode.OK)
				{
                    if(response.Data.status == "success" && response.Data.data.currency == currency && response.Data.data.amount >= amount)
					{
						
						return new Tuple<string, bool>(error, true);
					}
					else 
					{
						error = "Cannot verify flutterwave transaction";
						return new Tuple<string, bool>(error, false); 
					}
				}
				else
				{
					return new Tuple<string, bool>(error, true);
				}
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
				return new Tuple<string, bool>(null, true);
            }
        }

		public async Task<Tuple<FlutterwaveSubaccountResponseModel, int>> FlutterwaveCreateSubaccount(FlutterwaveSubaccountRequestModel model)
		{
			try
			{
				var client = new RestClient(AppConfig.FlutterwaveBaseURL);
				var request = new RestRequest("subaccounts", Method.POST);
				var requestBody = JsonConvert.SerializeObject(model);
				request.AddHeader("Authorization", "Bearer " + AppConfig.FlutterwaveSecKey);
				request.AddParameter("application/json", requestBody, ParameterType.RequestBody);
				var response = await client.ExecuteAsync<FlutterwaveSubaccountResponseModel>(request);
				return new Tuple<FlutterwaveSubaccountResponseModel, int>(response.Data, (int)response.StatusCode);
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex);
				return null;
			}
		}


	}
}
