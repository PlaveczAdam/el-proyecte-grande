using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace el_proyecte_grande_backend.Repositories.Reservations
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly GrandeHotelContext _context;

        public ReservationRepository(GrandeHotelContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            return await _context.Reservations.ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetFilteredReservations(
            string? boardType, 
            string? paymentMethod,
            uint? reservedFor, 
            bool? payFulfillment, 
            DateTime? startDate, 
            DateTime? endDate)
        {
            IEnumerable<Reservation> reservations = await GetAllAsync(); 

            if (!string.IsNullOrEmpty(boardType))
            {
                reservations = reservations.Where(r => r.BoardType.ToString().ToLower() == boardType.ToLower());
            }
            if (!string.IsNullOrEmpty(paymentMethod))
            {
                reservations = reservations.Where(r => r.PaymentMethod != null && r.PaymentMethod.ToString().ToLower() == paymentMethod.ToLower());
            }
            if (reservedFor != null)
            {
                reservations = reservations.Where(r => r.ReservedFor == reservedFor);
            }
            if (payFulfillment != null)
            {
                reservations = reservations.Where(r => r.PayFullfillment == payFulfillment);
            }
            if (startDate != null)
            {
                reservations = reservations.Where(r => r.EndDate < startDate);
            }
            if (endDate != null)
            {
                reservations = reservations.Where(r => r.StartDate > startDate);
            }

            return reservations;
        }

        public async Task<IEnumerable<Reservation>> GetHotelReservations(long hotelId)
        {
            IEnumerable<Reservation> reservations = await _context.Reservations
                    .Include(r => r.Hotel)
                    .ToListAsync();

                return reservations.Where(r => r.Hotel.Id == hotelId);
        }

        public async Task<Reservation?> GetAsync(long? id)
        {
            if (id is null)
                return null;

            return await _context.Reservations.FindAsync(id);
        }
        
        public async Task<Reservation?> GetWithDetailsAsync(long? id)
        {
            if (id is null)
                return null;
            

            return await _context.Reservations
                .Include(r => r.Hotel)
                .Include(r => r.Reservator)
                .Include(r => r.Rooms)
                .Include(r => r.Guests)
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);
        }


        public async Task<Reservation> AddAsync(Reservation reservation)
        {
            await _context.AddAsync(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }
        public async Task<Reservation> UpdateAsync(Reservation reservation)
        {
            _context.Update(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<Reservation?> SetReservationPayFulfillment(long id, PaymentMethod paymentMethod)
        {
            Reservation? reservationToUpdate = await GetAsync(id);
            if (reservationToUpdate == null)
                return null;

            reservationToUpdate.PayFullfillment = true;
            reservationToUpdate.PaymentMethod = paymentMethod;

            return await UpdateAsync(reservationToUpdate);
        }

        public async Task DeleteAsync(long id)
        {
            Reservation? reservation = await GetAsync(id);
            if (reservation != null)
                _context.Reservations.Remove(reservation);

            await _context.SaveChangesAsync();
        }
    }
}
