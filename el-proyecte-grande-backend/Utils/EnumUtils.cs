using el_proyecte_grande_backend.Models.Enums;

namespace el_proyecte_grande_backend.Utils
{
    public static class EnumUtils
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

            return Enum.GetValues(enumType).Cast<TEnum>();
        }


        private static IEnumerable<EnumDetails> GenerateEnumDetailslList()
        {
            EnumDetails boardTypeEnumDetails = new("BoardType", GetDictionaryOfEnum<BoardType>());
            EnumDetails classificationEnumDetails = new("Classification", GetDictionaryOfEnum<Classification>());
            EnumDetails genderEnumDetails = new("Gender", GetDictionaryOfEnum<Gender>());
            EnumDetails guestStatusEnumDetails = new("GuestStatus", GetDictionaryOfEnum<GuestStatus>());
            EnumDetails hotelStatusEnumDetails = new("HotelStatus", GetDictionaryOfEnum<HotelStatus>());
            EnumDetails itemTypeEnumDetails = new("ItemType", GetDictionaryOfEnum<ItemType>());
            EnumDetails paymentMethodEnumDetails = new("PaymentMethod", GetDictionaryOfEnum<PaymentMethod>());
            EnumDetails roomQualityEnumDetails = new("RoomQuality", GetDictionaryOfEnum<RoomQuality>());
            EnumDetails roomStatusEnumDetails = new("RoomStatus", GetDictionaryOfEnum<RoomStatus>());
            EnumDetails userRoleEnumDetails = new("UserRoles", GetDictionaryOfEnum<UserRole>());

            return new List<EnumDetails> { boardTypeEnumDetails, classificationEnumDetails, genderEnumDetails, guestStatusEnumDetails, hotelStatusEnumDetails, itemTypeEnumDetails, paymentMethodEnumDetails, roomQualityEnumDetails, roomStatusEnumDetails, userRoleEnumDetails };
        }
    }

}
