using JumgaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JumgaAPI.Data
{
	public class JumgaContext : DbContext
	{
		public JumgaContext(DbContextOptions<JumgaContext> option) : base(option)
		{

		}

		public DbSet<User> Users { set; get; }
		public DbSet<Shop> Shops { set; get; }
		public DbSet<Product> Products { set; get; }
		public DbSet<Order> Orders { set; get; }
		public DbSet<Item> Items { set; get; }
		public DbSet<Rider> Riders { set; get; }
	}
}
