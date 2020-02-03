using System;

namespace Vibe.Models
{
    public class SettingsData
    {
        public int Id { get; set; }
        public int HideProfilePicture { get; set; }
        public int NotificationShow { get; set; }
        public int NotificationSound { get; set; }
        public int ShowBio { get; set; }
        public int NotificationEmail { get; set; }
        public int ChatSound { get; set; }
        public string Status { get; set; }
    }
}
