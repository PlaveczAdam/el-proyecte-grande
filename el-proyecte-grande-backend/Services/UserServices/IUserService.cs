using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Services.UserServices
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<User> GetUserById(long id);
        public Task<User> CreateUser(User user);
        public Task<User> UpdateUser(long userId, User user);
        public Task<User> SetUserRole(long userId, Role role);
        public Task<User> UpdateUserActivity(long userId);
    }
}
