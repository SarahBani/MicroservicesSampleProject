using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Identity.APIService.Entities
{
    public class IdentityDbContext : IdentityDbContext<User, Role, int>
    {

        #region Constructors

        public IdentityDbContext(DbContextOptions<IdentityDbContext> options)
        : base(options)
        {

        }

        #endregion /Constructors

        #region Methods

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // after adding Identity this line is mandatory

            //This will singularize all table names
            foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName());
            }

            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());

            modelBuilder.Ignore<IdentityUserLogin<int>>();
            modelBuilder.Ignore<IdentityUserToken<int>>();
            modelBuilder.Ignore<IdentityRoleClaim<int>>();

            modelBuilder.Entity<IdentityUserRole<int>>(entity =>
            {
                entity.ToTable("UserRole");
            });
            modelBuilder.Entity<IdentityUserLogin<int>>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("UserLogin").HasNoKey();
            });
            modelBuilder.Entity<IdentityUserToken<int>>(entity =>
            {
                entity.HasNoKey();
                entity.ToTable("UserToken");
            });
            modelBuilder.Entity<IdentityUserClaim<int>>(entity =>
            {
                entity.ToTable("UserClaim");
            });
            modelBuilder.Entity<IdentityRoleClaim<int>>(entity =>
            {
                entity.ToTable("RoleClaim");
            });

            //modelBuilder.Seed();
            //modelBuilder.Seed2();
        }

        #endregion /Methods

    }

    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            int roleId = 1;
            int userId = 1;

            //Seeding a  'Administrator' role to AspNetRoles table
            modelBuilder.Entity<Role>().HasData(new Role
            {
                Id = roleId,
                Name = "Admin",
                NormalizedName = "Admin".ToUpper()
            });

            //a hasher to hash the password before seeding the user to the db
            var hasher = new PasswordHasher<User>();

            //Seeding the User to AspNetUsers table
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = userId,
                UserName = "sarah",
                Email = "sarah@yahoo.com",
                NormalizedUserName = "sarah".ToUpper(),
                NormalizedEmail = "sarah@yahoo.com".ToUpper(),
                PasswordHash = hasher.HashPassword(null, "123456")
            }
            );

            //Seeding the relation between our user and role to AspNetUserRoles table
            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int>
            {
                RoleId = roleId,
                UserId = userId
            }
            );
        }

        public static void Seed2(this ModelBuilder modelBuilder)
        {
            int roleId = 2;
            int userId = 2;

            modelBuilder.Entity<Role>().HasData(new Role
            {
                Id = 2,
                Name = "Clerk",
                NormalizedName = "Clerk".ToUpper()
            });

            modelBuilder.Entity<Role>().HasData(new Role
            {
                Id = 3,
                Name = "Client",
                NormalizedName = "Client".ToUpper()
            });

            modelBuilder.Entity<Role>().HasData(new Role
            {
                Id = 4,
                Name = "Guest",
                NormalizedName = "Guest".ToUpper()
            });

            //a hasher to hash the password before seeding the user to the db
            var hasher = new PasswordHasher<User>();

            //Seeding the User to AspNetUsers table
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = userId,
                UserName = "john",
                Email = "john@gmail.com",
                NormalizedUserName = "john".ToUpper(),
                NormalizedEmail = "john@gmail.com".ToUpper(),
                PasswordHash = hasher.HashPassword(null, "123456")
            }
            );

            //Seeding the relation between our user and role to AspNetUserRoles table
            modelBuilder.Entity<IdentityUserRole<int>>().HasData(new IdentityUserRole<int>
            {
                RoleId = roleId,
                UserId = userId
            }
            );
        }
    }

    //public static class ApplicationDbInitializer
    //{
    //    public static void SeedRole(RoleStore<IdentityRole> roleStore)
    //    {
    //        string[] roles = new string[] { "Admin", "Clerk", "Client", "Guest" };

    //        foreach (string role in roles)
    //        {
    //            if (!roleStore.Roles.Any(q => q.Name == role))
    //            {
    //                roleStore.CreateAsync(new IdentityRole(role));
    //            }
    //        }
    //    }

    //    public static void SeedUser(UserManager<IdentityUser> userManager)
    //    {
    //        if (userManager.FindByEmailAsync("sarah@yahoo.com").Result == null)
    //        {
    //            IdentityUser user = new IdentityUser
    //            {
    //                UserName = "sarah@yahoo.com",
    //                Email = "sarah@yahoo.com"
    //            };
    //            IdentityResult result = userManager.CreateAsync(user, "123456").Result;
    //            if (result.Succeeded)
    //            {
    //                userManager.AddToRoleAsync(user, "Admin").Wait();
    //            }
    //        }
    //    }
    //}
}
