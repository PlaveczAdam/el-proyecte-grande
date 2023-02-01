using el_proyecte_grande_backend.Models.Dtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Repositories.Room;
using Microsoft.AspNetCore.Mvc;

namespace el_proyecte_grande_backend.Controllers;

[ApiController, Route("/api/room")]
public class RoomController : ControllerBase
{
    private readonly IRoomRepository _repository;

    public RoomController(IRoomRepository repository)
    {
        _repository = repository;
    }

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

}
