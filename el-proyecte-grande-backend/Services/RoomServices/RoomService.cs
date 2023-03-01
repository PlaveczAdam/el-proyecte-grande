﻿using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Dtos.RoomDtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace el_proyecte_grande_backend.Services.RoomServices;

public class RoomService : IRoomService
{
    private readonly GrandeHotelContext _context;
    public RoomService(GrandeHotelContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<RoomDto>> GetAllRooms()
    {
        var rooms = await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .AsNoTracking()
            .ToListAsync();

        var roomDtos = new List<RoomDto>();
        foreach (var room in rooms)
        {
            var roomDto = CreateRoomDto(room);
            if (roomDto != null) roomDtos.Add(roomDto);
        }
        return roomDtos;
    }

    public async Task<IEnumerable<RoomDto>> GetAllRooms(long hotelId)
    {
        var rooms = await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .Where(r => r.Hotel.Id == hotelId)
            .AsNoTracking()
            .ToListAsync();

        var roomDtos = new List<RoomDto>();
        foreach (var room in rooms)
        {
            var roomDto = CreateRoomDto(room);
            if (roomDto != null) roomDtos.Add(roomDto);
        }
        return roomDtos;
    }

    public async Task<IEnumerable<RoomDto>?> GetFilteredRooms(
        string? hotelId,
        string? status,
        string? roomTypeId,
        string? maxPrice,
        string? date,
        string? accessible)
    {
        var roomsToFilterQuery = _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .AsNoTracking();


        if (hotelId != null)
        {
            var hotelIdParsed = long.TryParse(hotelId, out long filterHotelId);
            if (!hotelIdParsed) return null;
            roomsToFilterQuery = roomsToFilterQuery.Where(r => r.Hotel.Id == filterHotelId);
        }
        if (status != null)
        {
            var statusParsed = int.TryParse(status, out int filterRoomStatus);
            if (!statusParsed
                && filterRoomStatus >= Enum.GetNames(typeof(RoomStatus)).Length)
            {
                return null;
            }
            roomsToFilterQuery = roomsToFilterQuery.Where(r => (int)r.Status == filterRoomStatus);
        }
        if (roomTypeId != null)
        {
            var roomTypeIdParsed = long.TryParse(roomTypeId, out long filterRoomTypeId);
            if (!roomTypeIdParsed) return null;
            roomsToFilterQuery = roomsToFilterQuery.Where(r => r.RoomType.Id == filterRoomTypeId);
        }
        if (maxPrice != null)
        {
            var maxPriceParsed = double.TryParse(maxPrice, out double filterPrice);
            if (!maxPriceParsed) return null;
            roomsToFilterQuery = roomsToFilterQuery.Where(r => r.RoomType.Price <= filterPrice);
        }
        if (date != null)
        {
            var dateParsed = double.TryParse(date, out double filterDateInMs);
            if (!dateParsed) return null;
            var unix = DateTime.UnixEpoch.ToUniversalTime();
            DateTime filterDate = unix.AddMilliseconds(filterDateInMs).ToLocalTime();
            roomsToFilterQuery = roomsToFilterQuery.Where(r => r.Reservations.Any(res =>
                res.StartDate < filterDate && res.EndDate > filterDate));
        }
        if (accessible != null)
        {
            var accessibleParsed = bool.TryParse(accessible, out bool filterAccessible);
            if (!accessibleParsed) return null;
            roomsToFilterQuery = roomsToFilterQuery.Where(r => r.Accessible == filterAccessible);
        }

        var roomsToFilter = await roomsToFilterQuery.ToListAsync();
        var roomDtos = new List<RoomDto>();
        foreach (var room in roomsToFilterQuery)
        {
            var roomDto = CreateRoomDto(room);
            if (roomDto != null) roomDtos.Add(roomDto);
        }
        return roomDtos;
    }

    public async Task<RoomDto?> GetRoomById(long roomId)
    {
        var room = await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .Where(r => r.Id == roomId)
            .AsNoTracking()
            .SingleOrDefaultAsync();

        return CreateRoomDto(room);
    }
    public async Task<RoomDto?> AddRoom(NewRoom room)
    {
        if ((int)room.Status >= Enum.GetNames(typeof(RoomStatus)).Length)
        {
            return null;
        }

        var relatedHotel = await _context.Hotels.Where(h => h.Id == room.HotelId).SingleOrDefaultAsync();
        var relatedRoomType = await _context.RoomTypes.Where(t => t.Id == room.RoomTypeId).SingleOrDefaultAsync();
        if (relatedHotel == null || relatedRoomType == null) return null;

        var roomToAdd = new Room
        {
            Floor = room.Floor,
            DoorNo = room.DoorNo,
            Accessible = room.Accessible,
            Status = room.Status,
            Hotel = relatedHotel,
            RoomType = relatedRoomType,
            Reservations = new List<Reservation>()
        };

        await _context.Rooms.AddAsync(roomToAdd);
        await _context.SaveChangesAsync();
        return CreateRoomDto(roomToAdd);
    }
    public async Task<RoomDto?> UpdateRoom(long roomId, NewRoom room)
    {
        if ((int)room.Status >= Enum.GetNames(typeof(RoomStatus)).Length)
        {
            return null;
        }

        var relatedHotel = await _context.Hotels.Where(h => h.Id == room.HotelId).SingleOrDefaultAsync();
        var relatedRoomType = await _context.RoomTypes.Where(t => t.Id == room.RoomTypeId).SingleOrDefaultAsync();
        if (relatedHotel == null || relatedRoomType == null) return null;

        var roomToUpdate = await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .Where(r => r.Id == roomId)
            .SingleOrDefaultAsync();

        if (roomToUpdate == null) return null;
        roomToUpdate.Floor = room.Floor;
        roomToUpdate.DoorNo = room.DoorNo;
        roomToUpdate.Accessible = room.Accessible;
        roomToUpdate.Status = room.Status;
        roomToUpdate.Hotel = relatedHotel;
        roomToUpdate.RoomType = relatedRoomType;

        await _context.SaveChangesAsync();
        return CreateRoomDto(roomToUpdate);
    }

    public async Task<RoomDto?> SetRoomStatus(long roomId, int status)
    {
        var roomToUpdate = await _context.Rooms
            .Include(r => r.Hotel)
            .Include(r => r.RoomType)
            .Include(r => r.Reservations)
            .Where(r => r.Id == roomId)
            .SingleOrDefaultAsync();

        if (roomToUpdate == null || status >= Enum.GetNames(typeof(RoomStatus)).Length)
        {
            return null;
        }

        roomToUpdate.Status = (RoomStatus)status;
        await _context.SaveChangesAsync();
        return CreateRoomDto(roomToUpdate);
    }



    public async Task<IEnumerable<RoomTypeDto>> GetAllRoomTypes()
    {
        var roomTypes = await _context.RoomTypes
            .Include(rt => rt.Accessories)
            .AsNoTracking()
            .ToListAsync();

        var roomTypeDtos = new List<RoomTypeDto>();
        foreach (var roomType in roomTypes)
        {
            var roomTypeDto = CreateRoomTypeDto(roomType);
            if (roomTypeDto != null) roomTypeDtos.Add(roomTypeDto);
        }
        return roomTypeDtos;
    }

    public async Task<RoomTypeDto?> GetRoomTypeById(long roomTypeId)
    {
        var roomType = await _context.RoomTypes
            .Include(rt => rt.Accessories)
            .Where(rt => rt.Id == roomTypeId)
            .AsNoTracking()
            .SingleOrDefaultAsync();

        return CreateRoomTypeDto(roomType);
    }

    public async Task<RoomTypeDto?> AddRoomType(NewRoomType roomType)
    {
        if ((int)roomType.RoomQuality >= Enum.GetNames(typeof(RoomQuality)).Length)
        {
            return null;
        }

        var roomTypeToAdd = new RoomType
        {
            Name = roomType.Name,
            Price = roomType.Price,
            RoomQuality = roomType.RoomQuality,
            Accessories = new List<Accessory>()
        };

        await _context.RoomTypes.AddAsync(roomTypeToAdd);
        await _context.SaveChangesAsync();
        return CreateRoomTypeDto(roomTypeToAdd);
    }

    public async Task<RoomTypeDto?> UpdateRoomType(long roomTypeId, NewRoomType roomType)
    {
        if ((int)roomType.RoomQuality >= Enum.GetNames(typeof(RoomQuality)).Length)
        {
            return null;
        }

        var roomTypeToUpdate = await _context.RoomTypes
            .Include(rt => rt.Accessories)
            .Where(rt => rt.Id == roomTypeId)
            .SingleOrDefaultAsync();
        if (roomTypeToUpdate == null) return null;

        roomTypeToUpdate.Name = roomType.Name;
        roomTypeToUpdate.Price = roomType.Price;
        roomTypeToUpdate.RoomQuality = roomType.RoomQuality;

        await _context.SaveChangesAsync();
        return CreateRoomTypeDto(roomTypeToUpdate);
    }



    public async Task<IEnumerable<AccessoryDto>> GetAllAccessories()
    {
        var accesories = await _context.Accessories
            .Include(a => a.RoomType)
            .AsNoTracking()
            .ToListAsync();

        var accessoryDtos = new List<AccessoryDto>();
        foreach (var accessory in accesories)
        {
            var accessoryDto = CreateAccessoryDto(accessory);
            if (accessoryDto != null) accessoryDtos.Add(accessoryDto);
        }
        return accessoryDtos;
    }

    public async Task<AccessoryDto?> GetAccessoryById(long accessoryId)
    {
        var accessory = await _context.Accessories
            .Include(a => a.RoomType)
            .Where(a => a.Id == accessoryId)
            .AsNoTracking()
            .SingleOrDefaultAsync();

        return CreateAccessoryDto(accessory);
    }


    public async Task<AccessoryDto?> AddAccessory(NewAccessory accessory)
    {
        var relatedRoomType = await _context.RoomTypes.Where(rt => rt.Id == accessory.RoomTypeId).SingleOrDefaultAsync();
        if (relatedRoomType == null) return null;

        var accessoryToAdd = new Accessory
        {

            Name = accessory.Name,
            Quantity = accessory.Quantity,
            RoomType = relatedRoomType,
        };

        await _context.Accessories.AddAsync(accessoryToAdd);
        await _context.SaveChangesAsync();
        return CreateAccessoryDto(accessoryToAdd);
    }

    public async Task<AccessoryDto?> UpdateAccessory(long accessoryId, NewAccessory accessory)
    {
        var accessoryToUpdate = await _context.Accessories.Where(a => a.Id == accessoryId).SingleOrDefaultAsync();
        var relatedRoomType = await _context.RoomTypes.Where(rt => rt.Id == accessory.RoomTypeId).SingleOrDefaultAsync();
        if (accessoryToUpdate == null || relatedRoomType == null) return null;

        accessoryToUpdate.Name = accessory.Name;
        accessoryToUpdate.Quantity = accessory.Quantity;
        accessoryToUpdate.RoomType = relatedRoomType;

        await _context.SaveChangesAsync();
        return CreateAccessoryDto(accessoryToUpdate);
    }

    private RoomDto? CreateRoomDto(Room? room)
    {
        if (room == null) return null;
        var dto = new RoomDto()
        {
            Id = room.Id,
            Floor = room.Floor,
            DoorNo = room.DoorNo,
            Accessible = room.Accessible,
            Status = room.Status,
            HotelId = room.Hotel.Id,
            RoomTypeId = room.RoomType.Id,
            ReservationIds = new(),
        };
        room.Reservations.ToList().ForEach(r => { dto.ReservationIds.Add(r.Id); });
        return dto;
    }

    private RoomTypeDto? CreateRoomTypeDto(RoomType? roomType)
    {
        if (roomType == null) return null;
        var dto = new RoomTypeDto()
        {
            Id = roomType.Id,
            Name = roomType.Name,
            Price = roomType.Price,
            RoomQuality = roomType.RoomQuality,
            AccessoryIds = new(),
        };
        roomType.Accessories.ToList().ForEach(rt => { dto.AccessoryIds.Add(rt.Id); });
        return dto;
    }

    private AccessoryDto? CreateAccessoryDto(Accessory? accessory)
    {
        if (accessory == null) return null;
        var dto = new AccessoryDto()
        {
            Id = accessory.Id,
            Name = accessory.Name,
            Quantity = accessory.Quantity,
            RoomTypeId = accessory.RoomType.Id,
        };
        return dto;
    }

}