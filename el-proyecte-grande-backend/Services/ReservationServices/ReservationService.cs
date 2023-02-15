using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace el_proyecte_grande_backend.Services.ReservationServices
{
    public class ReservationService : IReservationService
    {
        private readonly GrandeHotelContext _context;

        public ReservationService(GrandeHotelContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Reservation>> GetAllAsync()
        {
            return await _context.Reservations
                    .Include(r => r.Hotel)
                    .Include(r => r.Reservator)
                    .AsNoTracking()
                    .ToListAsync();
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
                reservations = reservations.Where(r => r.PaymentMethod != null && r.PaymentMethod?.ToString().ToLower() == paymentMethod.ToLower());
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
                reservations = reservations.Where(r => r.StartDate >= startDate);
            }
            if (endDate != null)
            {
                reservations = reservations.Where(r => r.EndDate <= endDate);
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
                    .ThenInclude(res => res.Address)
                .Include(r => r.Rooms)
                .Include(r => r.Guests)
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Reservation> AddAsync(Reservation reservation, long[] roomIds)
        {
            Hotel? hotel = await GetHotelForNewReservation(reservation.Hotel.Id);
            if (hotel != null)
                reservation.Hotel = hotel;

            IEnumerable<long> idsOfReservedRooms = await GetIdsOfReservedRoomsForHotelBetween(reservation.Hotel.Id, reservation.StartDate, reservation.EndDate);

            foreach (long id in roomIds)
            {
                if (idsOfReservedRooms.Contains(id))
                    throw new Exception($"Room with the id of {id} is reserved for the specified time period");
            }

            ICollection<Room> rooms = await GetRoomsFromIds(roomIds);
            reservation.Rooms = rooms;

            await _context.AddAsync(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }
        public async Task<Reservation?> UpdateAsync(Reservation reservation, long[] updatedRoomIds)
        {
            // examine whether the Rooms for the Reservation have changed
            Reservation? resInDb = await GetWithDetailsAsync(reservation.Id);
            IEnumerable<long> roomIdsOfReservation = resInDb!.Rooms.Select(r => r.Id);

            //// we need this ICollection because reservation.Rooms do not contain any Rooms (they were not mapped from the DTO in the controller
            ICollection<long> roomIdsToActuallyAdd = new List<long>();

            foreach (long id in updatedRoomIds)
            {
                if (!roomIdsOfReservation.Contains(id))
                    roomIdsToActuallyAdd.Add(id);
            }

            List<long> idsOfRoomsToBeRemoved = new List<long>();
            foreach (long roomId in roomIdsOfReservation)
            {
                if (!updatedRoomIds.Contains(roomId))
                    idsOfRoomsToBeRemoved.Add(roomId);
            }

            foreach (long id in roomIdsToActuallyAdd)
            {
                Room room = resInDb.Rooms.FirstOrDefault(r => r.Id == id)!;
                resInDb.Rooms.Add(room);
            }
            //resInDb.Rooms = roomsToActuallyAdd;
            foreach (long id in idsOfRoomsToBeRemoved)
            {
                Room roomInReservation = resInDb.Rooms.FirstOrDefault(r => r.Id == id)!;
                resInDb.Rooms.Remove(roomInReservation);
            }

            resInDb.Rooms.Clear();
            _context.Update(resInDb);
            await _context.SaveChangesAsync();


            return await GetWithDetailsAsync(reservation.Id); // return with details for the frontend to show
        }

        public async Task<Reservation?> SetReservationToBeCancelled(long id, bool isCAncelled)
        {
            Reservation? reservationToUpdate = await GetAsync(id);
            if (reservationToUpdate == null)
                return null;

            reservationToUpdate.isCancelled = isCAncelled;

            _context.Update(reservationToUpdate);
            await _context.SaveChangesAsync();

            return await GetWithDetailsAsync(reservationToUpdate.Id);
        }

        public async Task<Reservation?> SetReservationPayFulfillment(long id, int paymentMethod)
        {
            Reservation? reservationToUpdate = await GetAsync(id);
            if (reservationToUpdate == null)
                return null;

            reservationToUpdate.PayFullfillment = true;
            reservationToUpdate.PaymentMethod = (PaymentMethod)paymentMethod;

            _context.Update(reservationToUpdate);
            await _context.SaveChangesAsync();

            return await GetWithDetailsAsync(reservationToUpdate.Id);
        }

        public async Task DeleteAsync(long id)
        {
            Reservation? reservation = await GetAsync(id);
            if (reservation != null)
                _context.Reservations.Remove(reservation);

            await _context.SaveChangesAsync();
        }

        private async Task<Hotel?> GetHotelForNewReservation(long hotelId)
        {
            return await _context.Hotels.FirstOrDefaultAsync(h => h.Id == hotelId);
        }

        private async Task<ICollection<Room>> GetRoomsFromIds(long[] roomIds)
        {
            ICollection<Room> rooms = new List<Room>();
            foreach (var item in roomIds)
            {
                Room? room = await _context.Rooms.FirstOrDefaultAsync(r => r.Id == item);
                if (room != null)
                    rooms.Add(room);
            }
            return rooms;
        }

        public async Task<bool> Exists(long id)
        {
            Reservation? reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
            return reservation != null;
        }

        public async Task<IEnumerable<Room>> GetEmptyRoomsForHotelBetween(long hotelId, DateTime startDate, DateTime endDate)
        {
            IEnumerable<long> idsOfReservedRooms = await GetIdsOfReservedRoomsForHotelBetween(hotelId, startDate, endDate);

            IEnumerable<Room> allRoomsInHotel = await _context.Rooms
                    .Include(room => room.Hotel)
                    .Include(r => r.Reservations)
                    .Where(room => room.Hotel.Id == hotelId)
                    .AsNoTracking()
                    .ToListAsync();

            IEnumerable<Room> freeRooms = allRoomsInHotel.Where(r => !idsOfReservedRooms.Contains(r.Id));

            return freeRooms;

        }



        private async Task<IEnumerable<long>> GetIdsOfReservedRoomsForHotelBetween(long hotelId, DateTime startDate, DateTime endDate)
        {
            List<Reservation> notConflictingReservationsInTimePeriod = await _context.Reservations
                    .Include(r => r.Hotel)
                    .Include(r => r.Rooms)
                    .Where(r => r.Hotel.Id == hotelId && (r.EndDate <= startDate || r.StartDate >= endDate || r.isCancelled))
                    .ToListAsync();

            IEnumerable<Reservation> allReservationsInTimePeriod = await _context.Reservations
                    .Include(r => r.Hotel)
                    .Include(r => r.Rooms)
                    .Where(r => r.Hotel.Id == hotelId).ToListAsync();


            IEnumerable<Reservation> conflictingReservationsInTimePeriod = allReservationsInTimePeriod.Except(notConflictingReservationsInTimePeriod);

            IEnumerable<ICollection<Room>> reservedRoomsForConflictingReservationsInTimePeriod = conflictingReservationsInTimePeriod.Select(res => res.Rooms);

            List<long> idsOfReservedRooms = new List<long>();
            foreach (ICollection<Room> roomsForReservation in reservedRoomsForConflictingReservationsInTimePeriod)
            {
                foreach (Room room in roomsForReservation)
                    idsOfReservedRooms.Add(room.Id);
            }

            return idsOfReservedRooms;

        }

    }
}
