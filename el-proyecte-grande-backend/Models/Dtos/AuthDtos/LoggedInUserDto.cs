namespace el_proyecte_grande_backend.Models.Dtos.AuthDtos
{
    public class LoggedInUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public IEnumerable<string> Roles { get; set;}
    }
}
