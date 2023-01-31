using el_proyecte_grande_backend.Models.Entities;
using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Extensions
{
    public static class EnumExtensions
    {
        private static IEnumerable<EnumDetails> _allEnumDetails = GenerateEnumDetailslList();

        public static EnumDetails? GetValuesOfEnum(string enumName)
        {
            return _allEnumDetails.FirstOrDefault(e => enumName == e.Name);
        }

        private static Dictionary<string, int> GetDictionaryOfEnum<TEnum>() where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            IEnumerable<TEnum> enumValues = GetValuesOfEnum<TEnum>();
            Dictionary<string, int> enumDictionary = enumValues.ToDictionary(t => t.ToString()!, t => Convert.ToInt32(t));
            return enumDictionary;
        }


        private static IEnumerable<TEnum> GetValuesOfEnum<TEnum>() where TEnum : struct, IComparable, IFormattable, IConvertible
        {
            Type? enumType = typeof(TEnum);

            if (!enumType.IsEnum)
                throw new ArgumentException();
            
            return  Enum.GetValues(enumType).Cast<TEnum>();
        }


        private static IEnumerable<EnumDetails> GenerateEnumDetailslList()
        {
            EnumDetails boardTypeEnumDetails = new("BoardType", GetDictionaryOfEnum<BoardType>());
            EnumDetails paymentMethodEnumDetails = new("PaymentMethod", GetDictionaryOfEnum<PaymentMethod>());
            EnumDetails gendernumDetails = new("Gender", GetDictionaryOfEnum<Gender>());

            return new List<EnumDetails> { boardTypeEnumDetails, paymentMethodEnumDetails, gendernumDetails };
        }
    }
}
