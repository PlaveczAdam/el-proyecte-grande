namespace el_proyecte_grande_backend.Models.Dtos
{
    public class AccessoryDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public uint Quantity { get; set; }
        public long RoomTypeId { get; set; }
    }
}
