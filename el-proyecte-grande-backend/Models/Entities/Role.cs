namespace el_proyecte_grande_backend.Models.Entities
{
    public class Role
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}