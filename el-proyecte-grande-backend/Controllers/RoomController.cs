using el_proyecte_grande_backend.Models.Dtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Services.RoomServices;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers;

[ApiController, Route("/api/room")]
public class RoomController : ControllerBase
{
    private readonly IRoomService _repository;

    public RoomController(IRoomService repository)
    {
        _repository = repository;
    }

    //Room

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetAllRooms()
    {
        return Ok(await _repository.GetAllRooms());
    }

    [HttpGet("/api/room/filter")]
    public async Task<ActionResult<IEnumerable<Room>>> GetFilteredRooms(
        [FromQuery] string? hotelId,
        [FromQuery] string? status,
        [FromQuery] string? roomTypeId,
        [FromQuery] string? maxPrice,
        [FromQuery] string? date,
        [FromQuery] string? accessible)
    {
        var returnedRooms = await _repository.GetFilteredRooms(
            hotelId,
            status,
            roomTypeId,
            maxPrice,
            date,
            accessible);

        if (returnedRooms != null)
        {
            return Ok(returnedRooms);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpGet("/api/room/{roomId}")]
    public async Task<ActionResult<Room?>> GetRoomById(long roomId)
    {
        var returnedRoom = await _repository.GetRoomById(roomId);
        if (returnedRoom != null)
        {
            return Ok(returnedRoom);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("/api/room/hotel/{hotelId}")]
    public async Task<ActionResult<IEnumerable<Room>>> GetRoomsByHotel(long hotelId)
    {
        return Ok(await _repository.GetAllRooms(hotelId));
    }

    [HttpPost]
    public async Task<ActionResult<Room?>> PostRoom([FromBody] NewRoom room)
    {
        var returnedRoom = await _repository.AddRoom(room);
        if (returnedRoom != null)
        {
            return Ok(returnedRoom);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut("/api/room/{roomId}")]
    public async Task<ActionResult<Room?>> PutRoom(long roomId, [FromBody] NewRoom room)
    {
        var returnedRoom = await _repository.UpdateRoom(roomId, room);
        if (returnedRoom != null)
        {
            return Ok(returnedRoom);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut("/api/room/status/{roomId}")]
    public async Task<ActionResult<Room?>> PutRoomStatus(long roomId, [FromQuery] int status)
    {
        var returnedRoom = await _repository.SetRoomStatus(roomId, status);
        if (returnedRoom != null)
        {
            return Ok(returnedRoom);
        }
        else
        {
            return BadRequest();
        }
    }

    //RoomType

    [HttpGet("/api/room/roomtype")]
    public async Task<ActionResult<IEnumerable<RoomTypeDto>>> GetAllRoomTypes()
    {
        return Ok(await _repository.GetAllRoomTypes());
    }

    [HttpGet("/api/room/roomtype/{roomTypeId}")]
    public async Task<ActionResult<RoomTypeDto?>> GetRoomTypeById(long roomTypeId)
    {
        var returnedRoomType = await _repository.GetRoomTypeById(roomTypeId);
        if (returnedRoomType != null)
        {
            return Ok(returnedRoomType);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost("/api/room/roomtype")]
    public async Task<ActionResult<RoomTypeDto?>> PostRoomType([FromBody] NewRoomType roomType)
    {
        var returnedRoomType = await _repository.AddRoomType(roomType);
        if (returnedRoomType != null)
        {
            return Ok(returnedRoomType);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut("/api/room/roomtype/{roomTypeId}")]
    public async Task<ActionResult<RoomTypeDto?>> PutRoomType(long roomTypeId, [FromBody] NewRoomType roomType)
    {
        var returnedRoomType = await _repository.UpdateRoomType(roomTypeId, roomType);
        if (returnedRoomType != null)
        {
            return Ok(returnedRoomType);
        }
        else
        {
            return BadRequest();
        }
    }

    //Accessory

    [HttpGet("/api/room/accessory")]
    public async Task<ActionResult<IEnumerable<AccessoryDto>>> GetAllAccessories()
    {
        return Ok(await _repository.GetAllAccessories());
    }

    [HttpGet("/api/room/accessory/{accessoryId}")]
    public async Task<ActionResult<AccessoryDto?>> GetaccessoryById(long accessoryId)
    {
        var returnedAccessory = await _repository.GetAccessoryById(accessoryId);
        if (returnedAccessory != null)
        {
            return Ok(returnedAccessory);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost("/api/room/accessory")]
    public async Task<ActionResult<AccessoryDto?>> PostAccessory([FromBody] NewAccessory accessory)
    {
        var returnedAccessory = await _repository.AddAccessory(accessory);
        if (returnedAccessory != null)
        {
            return Ok(returnedAccessory);
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut("/api/room/accessory/{accessoryId}")]
    public async Task<ActionResult<AccessoryDto?>> PutAccessory(long accessoryId, [FromBody] NewAccessory accessory)
    {
        var returnedAccessory = await _repository.UpdateAccessory(accessoryId, accessory);
        if (returnedAccessory != null)
        {
            return Ok(returnedAccessory);
        }
        else
        {
            return BadRequest();
        }
    }
}
