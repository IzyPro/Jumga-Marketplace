using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI
{
	public static class AppConfig
	{
		public static string FlutterwaveBaseURL { get {return "https://api.flutterwave.com/v3/";  } }
		public static string FlutterwaveKey { get { return "FLWPUBK_TEST-5e45b95141887054d7680c949659c495-X"; } }
		public static string FlutterwaveSecKey { get { return "FLWSECK_TEST-3d62915049c60dca43489d2ad2d274bb-X"; } }
	}
}
