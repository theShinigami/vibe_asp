using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Settings
    {
        public int Id { get; set; }
        public ulong? HideProfilePicture { get; set; }
        public ulong? NotificationShow { get; set; }
        public ulong? NotificationSound { get; set; }
        public ulong? ShowBio { get; set; }
        public int? UserId { get; set; }

        public virtual Users User { get; set; }
    }
}
