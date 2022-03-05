
const db = require('quick.db')

const Discord = require('discord.js')
module.exports = {
name : 'blacklist',
  description: 'اعطاء بلاك لست لشخص',	
  options: [	
	{		
    name: 'الشخص',		
    description: 'الشخص الي بدك تعطيه ',			type: 6,		
    required: true,	
	},
            {	
		name: 'سبب',		
	description: 'سبب البلاك لست',	
	required: true,	
type: 3,	
	},	],
  timeout: 3000,

  category: 'Bot',
  run: async (client,interaction) => {
    const user = interaction.options.getMember('الشخص');		const reason = interaction.options.getString('سبب') ;

    const roll = db.get(`rol_${interaction.guild.id}`)
    
    const channel = db.get(`log_${interaction.guild.id}`)
    console.log(roll)
    

    const guild = client.guilds.cache.get(interaction.guild.id)
    
    var member = guild.members.cache.get(user.id)
    user.roles.add(`${roll}`)
    let embed = new Discord.MessageEmbed()
    .setDescription(`
**User Blacklisted Successfuly ✅**
`)
    db.set(`users_${user.id}`,true)
  
    interaction.reply({embeds : [embed]})
    let embed2 = new Discord.MessageEmbed()
    .setTitle(`Blacklist System `)
    .addField('🧑 | User', `${user.id} - <@${user.id}>`)
    .addField(`🛠 | Admin User`, `${interaction.member.id} - <@${interaction.member.id}>`)
    .addField('🗝 | Reason',`${reason}`)

    let log = client.channels.cache.get(channel).send({embeds : [embed2]})
    
 
  },
};
