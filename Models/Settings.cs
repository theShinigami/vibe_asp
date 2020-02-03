using System;
using System.Collections.Generic;

namespace Vibe.Models
{
    public partial class Settings
    {
        public int Id { get; set; }
        public int? HideProfilePicture { get; set; }
        public int? NotificationShow { get; set; }
        public int? NotificationSound { get; set; }
        public int? ShowBio { get; set; }
        public int? UserId { get; set; }
        public int? NotificationEmail { get; set; }
        public int? ChatSound { get; set; }

        public virtual Users User { get; set; }
    }
}
