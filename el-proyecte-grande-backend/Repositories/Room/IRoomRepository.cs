using el_proyecte_grande_backend.Models.Dtos;

namespace el_proyecte_grande_backend.Repositories.Room;

public interface IRoomRepository
{
    Task<IEnumerable<Models.Entities.Room>> GetAllRooms();
    Task<IEnumerable<Models.Entities.Room>> GetAllRooms(long hotelId);
    Task<IEnumerable<Models.Entities.Room>?> GetFilteredRooms(
        string? hotelId,
        string? status, string? roomTypeId,
        string? maxPrice,
        string? date,
        string? accessible);
    Task<Models.Entities.Room?> GetRoomById(long roomId);
    Task<Models.Entities.Room?> AddRoom(NewRoom room);
    Task<Models.Entities.Room?> UpdateRoom(long roomId, NewRoom room);
    Task<Models.Entities.Room?> SetRoomStatus(long roomId, int status);
}
