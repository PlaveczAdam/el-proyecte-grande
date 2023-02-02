using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Models.Dtos;

public class NewRoomType
{
    public string Name { get; set; }
    public double Price { get; set; }
    public RoomQuality RoomQuality { get; set; }
}
