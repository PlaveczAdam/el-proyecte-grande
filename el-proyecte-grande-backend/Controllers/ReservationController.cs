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

        public ReservationController(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }



        // GET: api/Reservation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetAllReservations()
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetAllAsync();
            return Ok(reservations);
        }

        // GET: api/Reservation/Hotel/hotelId
        [HttpGet("hotel/{hotelId}")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetHotelReservations(long hotelId)
        {
            IEnumerable<Reservation> reservations = await _reservationRepository.GetHotelReservations(hotelId);
            return Ok(reservations);
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
            return Ok(reservations);
        }


        // GET: api/Reservation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(long id)
        {
            Reservation? reservation = await _reservationRepository.GetWithDetailsAsync(id);

            if (reservation == null)
                return NotFound(JsonConvert.SerializeObject(new { message = $"Reservation with the id of {id} does not exist" }));

            return Ok(reservation);
        }


        // POST: api/Reservation
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            //_context.Reservations.Add(reservation);
            //await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        // PUT: api/Reservation/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservation(long id, Reservation reservation)
        {
            //if (id != reservation.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(reservation).State = EntityState.Modified;

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
        public async Task<IActionResult> SetReservationPayFulfillment(long id, Reservation reservation)
        {

            return NoContent();
        }

        // DELETE: api/Reservation/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(long id)
        {
            //var reservation = await _context.Reservations.FindAsync(id);
            //if (reservation == null)
            //{
            //    return NotFound();
            //}

            //_context.Reservations.Remove(reservation);
            //await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
