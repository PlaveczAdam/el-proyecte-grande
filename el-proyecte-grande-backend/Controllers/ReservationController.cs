using AutoMapper;
using el_proyecte_grande_backend.Models.Dtos.Reservation;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Repositories.Reservations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace el_proyecte_grande_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;

        public ReservationController(IReservationRepository reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }



        // GET: api/Reservation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetAllReservations()
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetAllAsync();
            IEnumerable<GetAllReservationDTO> reservationDTOs = _mapper.Map<IEnumerable<GetAllReservationDTO>>(reservations);
            return Ok(reservationDTOs);
        }

        // GET: api/Reservation/Hotel/hotelId
        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetHotelReservations(long hotelId)
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetHotelReservations(hotelId);
            IEnumerable<GetAllReservationDTO> reservationDTOs = _mapper.Map<IEnumerable<GetAllReservationDTO>>(reservations);
            return Ok(reservationDTOs);
        }

        // GET: api/Reservation/flter
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetFilteredReservations(
            string? boardType,
            string? paymentMethod,
            uint? reservedFor,
            bool? payFulfillment,
            DateTime? startDate,
            DateTime? endDate
            )
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetFilteredReservations(boardType, paymentMethod, reservedFor, payFulfillment, startDate, endDate);
            IEnumerable<GetAllReservationDTO> reservationDTOs = _mapper.Map<IEnumerable<GetAllReservationDTO>>(reservations);
            return Ok(reservationDTOs);
        }


        // GET: api/Reservation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(long id)
        {
            Reservation? reservation = await _reservationRepository.GetWithDetailsAsync(id);

            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            GetReservationDTO reservationDTO = _mapper.Map<GetReservationDTO>(reservation);
            return Ok(reservationDTO);
        }


        // POST: api/Reservation
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(AddReservationDTO reservationDTO)
        {
            Reservation reservationToAdd = _mapper.Map<Reservation>(reservationDTO);
            Reservation? createdReservation = await _reservationRepository.AddAsync(reservationToAdd, reservationDTO.RoomIds);

            GetReservationDTO createdReservationDTO = _mapper.Map<GetReservationDTO>(createdReservation);

            return CreatedAtAction("GetReservation", new { id = createdReservation.Id }, createdReservationDTO);
        }

        // PUT: api/Reservation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservation(long id, UpdateReservationDTO reservationDTO)
        {
            Reservation? reservation = await _reservationRepository.GetWithDetailsAsync(id);

            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!ReservationExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return NoContent();
        }


        // PUT: /api/reservation/status/5
        [HttpPut("status/{id}")]
        public async Task<IActionResult> SetReservationPayFulfillment(long id, Reservation reservationDTO)
        {
            Reservation? reservation = await _reservationRepository.GetAsync(id);
            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            return NoContent();
        }

        // DELETE: api/Reservation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(long id)
        {
            Reservation? reservation = await _reservationRepository.GetAsync(id);
            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            await _reservationRepository.DeleteAsync(id);

            return Ok(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} has been deleted successfully" }));
        }



    }
}
