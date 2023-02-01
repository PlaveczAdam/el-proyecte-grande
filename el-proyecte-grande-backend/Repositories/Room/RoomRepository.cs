using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Dtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace el_proyecte_grande_backend.Repositories.Room;

public class RoomRepository : IRoomRepository
{
    private readonly GrandeHotelContext _context;
    public RoomRepository(GrandeHotelContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Models.Entities.Room>> GetAllRooms()
    {
        return await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Entities.Room>> GetAllRooms(long hotelId)
    {
        return await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .Where(r => r.Hotel.Id == hotelId)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<IEnumerable<Models.Entities.Room>?> GetFilteredRooms(
        string? hotelId,
        string? status,
        string? roomTypeId,
        string? maxPrice,
        string? date,
        string? accessible)
    {
        var roomsToFilter = await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .AsNoTracking()
            .ToListAsync();

        if (hotelId != null)
        {
            var hotelIdParsed = long.TryParse(hotelId, out long filterHotelId);
            if (!hotelIdParsed) return null;
            roomsToFilter = roomsToFilter.Where(r => r.Hotel.Id == filterHotelId).ToList();
        }
        if (status != null)
        {
            var statusParsed = int.TryParse(status, out int filterRoomStatus);
            if (!statusParsed
                && filterRoomStatus >= Enum.GetNames(typeof(RoomStatus)).Length)
            {
                return null;
            }
            roomsToFilter = roomsToFilter.Where(r => (int)r.Status == filterRoomStatus).ToList();
        }
        if (roomTypeId != null)
        {
            var roomTypeIdParsed = long.TryParse(roomTypeId, out long filterRoomTypeId);
            if (!roomTypeIdParsed) return null;
            roomsToFilter = roomsToFilter.Where(r => r.RoomType.Id == filterRoomTypeId).ToList();
        }
        if (maxPrice != null)
        {
            var maxPriceParsed = double.TryParse(maxPrice, out double filterPrice);
            if (!maxPriceParsed) return null;
            roomsToFilter = roomsToFilter.Where(r => r.RoomType.Price <= filterPrice).ToList();
        }
        if (date != null)
        {
            var dateParsed = DateTime.TryParse(date, out DateTime filterDate);
            if (!dateParsed) return null;
            roomsToFilter = roomsToFilter.Where(r => r.Reservations.Any(res => 
                (res.StartDate < filterDate) && (res.EndDate > filterDate))).ToList();
        }
        if (accessible != null)
        {
            var accessibleParsed = bool.TryParse(accessible, out bool filterAccessible);
            if (!accessibleParsed) return null;
            roomsToFilter = roomsToFilter.Where(r => r.Accessible == filterAccessible).ToList();
        }

        return roomsToFilter;
    }

    public async Task<Models.Entities.Room?> GetRoomById(long roomId)
    {
        return await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .Where(r => r.Id == roomId)
            .AsNoTracking()
            .SingleOrDefaultAsync();
    }
    public async Task<Models.Entities.Room?> AddRoom(NewRoom room)
    {
        var relatedHotel = await _context.Hotels.Where(h => h.Id == room.HotelId).SingleOrDefaultAsync();
        var relatedRoomType = await _context.RoomTypes.Where(t => t.Id == room.RoomTypeId).SingleOrDefaultAsync();
        if (relatedHotel == null || relatedRoomType == null) return null;

        var roomToAdd = new Models.Entities.Room
        {
            Floor = room.Floor,
            DoorNo = room.DoorNo,
            Accessible = room.Accessible,
            Status = room.Status,
            Hotel = relatedHotel,
            RoomType = relatedRoomType,
            Reservations = new List<Reservation>()
        };

        if (roomToAdd.Hotel == null
            || roomToAdd.RoomType == null
            || (int)roomToAdd.Status >= Enum.GetNames(typeof(RoomStatus)).Length)
        {
            return null;
        }

        await _context.Rooms.AddAsync(roomToAdd);
        await _context.SaveChangesAsync();
        return roomToAdd;
    }
    public async Task<Models.Entities.Room?> UpdateRoom(long roomId, NewRoom room)
    {
        var relatedHotel = await _context.Hotels.Where(h => h.Id == room.HotelId).SingleOrDefaultAsync();
        var relatedRoomType = await _context.RoomTypes.Where(t => t.Id == room.RoomTypeId).SingleOrDefaultAsync();
        if (relatedHotel == null || relatedRoomType == null) return null;

        var roomToUpdate = await _context.Rooms.Where(r => r.Id == roomId).SingleOrDefaultAsync();
        if (roomToUpdate == null) return null;
        roomToUpdate.Floor = room.Floor;
        roomToUpdate.DoorNo = room.DoorNo;
        roomToUpdate.Accessible = room.Accessible;
        roomToUpdate.Status = room.Status;
        roomToUpdate.Hotel = relatedHotel;
        roomToUpdate.RoomType = relatedRoomType;

        if (roomToUpdate.Hotel == null
            || roomToUpdate.RoomType == null
            || (int)roomToUpdate.Status >= Enum.GetNames(typeof(RoomStatus)).Length)
        {
            return null;
        }
        await _context.SaveChangesAsync();

        return roomToUpdate;
    }

    public async Task<Models.Entities.Room?> SetRoomStatus(long roomId, int status)
    {
        var roomToUpdate = await _context.Rooms.Where(r => r.Id == roomId).SingleOrDefaultAsync();
        if (roomToUpdate == null || status >= Enum.GetNames(typeof(RoomStatus)).Length)
        {
            return null;
        }

        roomToUpdate.Status = (RoomStatus)status;
        await _context.SaveChangesAsync();
        return roomToUpdate;
    }

}
