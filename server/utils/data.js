const supabase = require('./supabase');

async function readAttendees() {
  try {
    const { data, error } = await supabase
      .from('attendees')
      .select('*')
      .order('registered_at', { ascending: false });

    if (error) {
      console.error('Error reading attendees:', error);
      throw error;
    }

    return data.map(attendee => ({
      id: attendee.id,
      fullName: attendee.full_name,
      email: attendee.email,
      club: attendee.club,
      role: attendee.role,
      comments: attendee.comments || '',
      registeredAt: attendee.registered_at,
    }));
  } catch (error) {
    console.error('Error reading attendees from database:', error);
    throw error;
  }
}

async function writeAttendees(attendees) {
  throw new Error('writeAttendees is deprecated. Use createAttendee instead.');
}

async function createAttendee(attendeeData) {
  try {
    const { data, error } = await supabase
      .from('attendees')
      .insert({
        full_name: attendeeData.fullName,
        email: attendeeData.email.toLowerCase(),
        club: attendeeData.club,
        role: attendeeData.role,
        comments: attendeeData.comments || '',
        registered_at: attendeeData.registeredAt || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('This email has already been registered.');
      }
      console.error('Error creating attendee:', error);
      throw error;
    }

    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      club: data.club,
      role: data.role,
      comments: data.comments || '',
      registeredAt: data.registered_at,
    };
  } catch (error) {
    if (error.message === 'This email has already been registered.') {
      throw error;
    }
    console.error('Error creating attendee:', error);
    throw error;
  }
}

async function findAttendeeByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('attendees')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      console.error('Error finding attendee:', error);
      throw error;
    }

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      fullName: data.full_name,
      email: data.email,
      club: data.club,
      role: data.role,
      comments: data.comments || '',
      registeredAt: data.registered_at,
    };
  } catch (error) {
    console.error('Error finding attendee:', error);
    throw error;
  }
}

module.exports = {
  readAttendees,
  writeAttendees,
  createAttendee,
  findAttendeeByEmail,
};

