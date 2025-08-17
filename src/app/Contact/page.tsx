import Contact from "./Contact"
import Mobile from "../Component/Component/Mobile/Mobile"

export default function Contacts(){

    return(
        <>


          <div className="relative">
              {/* Background home page */}
              <div className="blur-sm">
                <Mobile />
              </div>
        
              {/* Projects overlay - only shows on mobile */}
              <Contact />
            </div>
        
        
        
        </>
    )
}