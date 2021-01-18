using JumgaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Services
{
	public interface IUserService
	{
		bool SaveChanges();
		Task<User> Authenticate(string email, string password);
		Task<User> Register(User user);
		Task<IEnumerable<User>> GetUsers();
		Task<User> GetUserById(int id);

		Task<User> GetUserByUsername(string username);
		bool IsUserExist(string email);

		bool IsUserNameExist(string username);
		Task<User> GetUserByEmail(string email);
		string GenerateToken(User user);
	}
}
