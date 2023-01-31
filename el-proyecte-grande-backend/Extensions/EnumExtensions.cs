using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Extensions
{
    public static class EnumExtensions
    {
        private static IEnumerable<EnumDetails> _allEnumDetails = GenerateEnumDetailslList();

        public static EnumDetails? GetValuesOfEnum(this Enum enumName)
        {
            return _allEnumDetails.FirstOrDefault(e => enumName.ToString() == e.Name);
        }


        private static IEnumerable<EnumDetails> GenerateEnumDetailslList()
        {
            Dictionary<string, int> boardTypes = Enum.GetValues(typeof(BoardType))
                .Cast<BoardType>()
                .ToDictionary(t => t.ToString(), t => (int)t);

            Dictionary<string, int> paymentMethods = Enum.GetValues(typeof(PaymentMethod))
                .Cast<PaymentMethod>()
                .ToDictionary(t => t.ToString(), t => (int)t);

            EnumDetails boardTypeEnumDetails = new("BoardType", boardTypes);
            EnumDetails paymentMethodsEnumDetails = new("PaymentMethods", paymentMethods);

            return new List<EnumDetails> { boardTypeEnumDetails,paymentMethodsEnumDetails };
        }
    }
}
