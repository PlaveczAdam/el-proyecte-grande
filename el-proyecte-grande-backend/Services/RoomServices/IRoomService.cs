using el_proyecte_grande_backend.Models.Dtos.RoomDtos;
using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Services.RoomServices;

public interface IRoomService
{
    Task<IEnumerable<RoomDto>> GetAllRooms();
    Task<IEnumerable<RoomDto>> GetAllRooms(long hotelId);
    Task<IEnumerable<RoomDto>?> GetFilteredRooms(
        string? hotelId,
        string? status, string? roomTypeId,
        string? maxPrice,
        string? date,
        string? accessible);
    Task<RoomDto?> GetRoomById(long roomId);
    Task<RoomDto?> AddRoom(NewRoom room);
    Task<RoomDto?> UpdateRoom(long roomId, NewRoom room);
    Task<RoomDto?> SetRoomStatus(long roomId, int status);

    Task<IEnumerable<RoomTypeDto>> GetAllRoomTypes();
    Task<RoomTypeDto?> GetRoomTypeById(long roomTypeId);
    Task<RoomTypeDto?> AddRoomType(NewRoomType roomType);
    Task<RoomTypeDto?> UpdateRoomType(long roomTypeId, NewRoomType roomType);

    Task<IEnumerable<AccessoryDto>> GetAllAccessories();
    Task<AccessoryDto?> GetAccessoryById(long accessoryId);
    Task<AccessoryDto?> AddAccessory(NewAccessory accessory);
    Task<AccessoryDto?> UpdateAccessory(long accessoryId, NewAccessory accessory);
}