using el_proyecte_grande_backend.Models.Entities;

namespace el_proyecte_grande_backend.Services.ReservationServices
{
    public interface IReservationService
    {
        Task<IEnumerable<Reservation>> GetAllAsync();
        Task<IEnumerable<Reservation>> GetHotelReservations(long hotelId);
        Task<IEnumerable<Reservation>> GetFilteredReservations(
            string? boardType,
            string? paymentMethod,
            uint? reservedFor,
            bool? payFulfillment,
            DateTime? startDate,
            DateTime? endDate);

        Task<Reservation?> GetAsync(long? id);
        Task<Reservation?> GetWithDetailsAsync(long? id);

        Task<Reservation> AddAsync(Reservation reservation, long[] roomIds);
        Task<Reservation?> UpdateAsync(Reservation reservation, long[] roomIds);
        Task<Reservation?> SetReservationToBeCancelled(long id, bool isCancelled);
        Task<Reservation?> SetReservationPayFulfillment(long id, int paymentMethod);
        Task DeleteAsync(long id);
        Task<bool> Exists(long id);
        Task<IEnumerable<Room>> GetEmptyRoomsForHotelBetween(long hotelId, DateTime startDate, DateTime endDate);
    }
}
