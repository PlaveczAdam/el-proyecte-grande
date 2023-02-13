using el_proyecte_grande_backend.Models.Dtos.GuestDtos;
using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Services.GuestServices
{
    public interface IGuestService
    {
        Task<IEnumerable<Guest>> GetAllGuestsAsync();
        Task<IEnumerable<Guest>> GetAllGuestByHotelAsync(long hotelId);
        Task<IEnumerable<Guest>> GetFilteredGuestListAsync(long? hotelId, GuestStatus? guestStatus);
        Task<Guest?> GetGuestByIdAsync(long guestId);
        Task<Guest?> AddGuestAsync(GuestUpdateDto guest);
        Task<Guest?> UpdateGuestAsync(long guestId, GuestUpdateDto guest);
        Task<Guest?> UpdateGuestStatusAsync(long guestId, int guestStatus);
    }
}
