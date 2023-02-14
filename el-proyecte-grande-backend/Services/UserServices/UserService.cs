using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly GrandeHotelContext _context;

        public UserService(GrandeHotelContext context)
        {
            _context = context;
        }

        public Task<User> CreateUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUserById(long id)
        {
            throw new NotImplementedException();
        }

        public Task<User> SetUserRole(long userId, string role)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateUser(long userId, User user)
        {
            throw new NotImplementedException();
        }

        public Task<User> UpdateUserActivity(long userId)
        {
            throw new NotImplementedException();
        }
    }
}
