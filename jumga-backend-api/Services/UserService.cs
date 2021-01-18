using JumgaAPI.Data;
using JumgaAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace JumgaAPI.Services
{
	public class UserService : IUserService
	{
		private readonly JwtModel _jwtSettings;
		private readonly JumgaContext _context;
		public UserService(IOptions<JwtModel> jwtSettings, JumgaContext context)
		{
			_jwtSettings = jwtSettings.Value;
			_context = context;
		}
		public string GenerateToken(User user)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Email),
				new Claim("Id", user.Id.ToString()),
				new Claim("role", user.UserRole),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
			};
			var token = new JwtSecurityToken(
					issuer: _jwtSettings.Issuer,
					audience: _jwtSettings.Audience,
					claims: claims,
					expires: DateTime.Now.AddMinutes(30),
					signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}


		public async Task<User> Authenticate(string email, string password)
		{
			if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
				return null;
			var user = await _context.Users
				.Include(s => s.UserShop)
					.ThenInclude(p => p.Products)
				.Include(o => o.UserShop.Orders)
				.FirstOrDefaultAsync(u => u.Email == email);
			if (user == null || !BC.Verify(password, user.Password))
				return null;

			return user;
		}
		public async Task<User> Register(User user)
		{
			if (user == null)
			{
				throw new ArgumentNullException(nameof(user));
			}
			await _context.Users.AddAsync(user);
			return user;
		}
		public bool SaveChanges()
		{
			return (_context.SaveChanges() >= 0);
		}
		public async Task<IEnumerable<User>> GetUsers()
		{
			return await _context.Users
				.Include(s => s.UserShop)
					.ThenInclude(p => p.Products)
				.Include(o => o.UserShop.Orders)
				.ToListAsync();
		}
		public async Task<User> GetUserById(int id)
		{
			return await _context.Users
				.Include(s => s.UserShop)
					.ThenInclude(p => p.Products)
				.Include(o => o.UserShop.Orders)
				.FirstOrDefaultAsync(u => u.Id == id);
		}
		public bool IsUserExist(string email)
		{
			bool isExist = false;
			var user = _context.Users.FirstOrDefault(u => u.Email == email);
			isExist = user == null ? false : true;
			return isExist;
		}
		public async Task<User> GetUserByEmail(string email)
		{
			return await _context.Users
				.Include(s => s.UserShop)
					.ThenInclude(p => p.Products)
				.Include(o => o.UserShop.Orders)
				.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
		}

		public async Task<User> GetUserByUsername(string username)
		{
			return await _context.Users
				.Include(s => s.UserShop)
					.ThenInclude(p => p.Products)
				.Include(o => o.UserShop.Orders)
				.FirstOrDefaultAsync(u => u.UserName.ToLower() == username.ToLower());
		}

		public bool IsUserNameExist(string username)
		{
			bool isExist = false;
			var user = _context.Users.FirstOrDefault(u => u.UserName == username);
			isExist = user == null ? false : true;
			return isExist;
		}
	}
}
