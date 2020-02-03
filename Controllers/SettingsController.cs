using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Vibe.Models;

namespace Vibe.Controllers
{
    [ApiController]
    [Route("api/Settings")]
    public class SettingsController : ControllerBase
    {
        private readonly ILogger<SettingsController> _logger;
        private vibeContext vibedbContext = new vibeContext();

        public SettingsController(ILogger<SettingsController> logger)
        {
            _logger = logger;
        }


        [HttpGet("get/{id}")]
        public SettingsData Get(int id) {
            var result = this.vibedbContext.Settings
                                    .Where(s => s.UserId == id);
            
            // if we found a match
            if (result.Any()) {
                var listData = result.ToList()[0];

                return new SettingsData {
                    Id = listData.Id,
                    HideProfilePicture = (int)listData.HideProfilePicture,
                    NotificationShow = (int)listData.NotificationShow,
                    NotificationSound = (int)listData.NotificationSound,
                    ShowBio = (int)listData.ShowBio,
                    NotificationEmail = (int)listData.NotificationEmail,
                    ChatSound = (int)listData.ChatSound,
                    Status = "Success"
                };
            } else {
                return new SettingsData {
                    Status = "Failed"
                };
            } 
        }

        [HttpPost("save")]
        public int Post() {
            var collection = Request.Form;

            var hide_profile_picture = collection["hide_profile_picture"];
            var notf_mute = collection["notification_mute"];
            var notf_sound = collection["notification_sound"];
            var show_bio = collection["show_bio"];
            var notf_email = collection["notification_email"];
            var chat_sound = collection["chat_sound"];
            var userID = collection["userID"];

            var result = this.vibedbContext.Settings
                                    .First(s => s.UserId == int.Parse(userID));

            if (result != null) {

                // update values

                result.HideProfilePicture = int.Parse(hide_profile_picture);
                result.NotificationShow = int.Parse(notf_mute);
                result.NotificationSound = int.Parse(notf_sound);
                result.ShowBio = int.Parse(show_bio);
                result.NotificationEmail = int.Parse(notf_email);
                result.ChatSound = int.Parse(chat_sound);

                // save
                this.vibedbContext.SaveChanges();


                return 1;

            } else {
                return 0;
            }
        }
        
    }
}
