import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
      const [menu, setMenu] = useState([]);
      const axiosPublic = useAxiosPublic()
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        axiosPublic(`/menu`)
          .then(({data}) => {
            setMenu(data);
            setLoading(false)
          });



      }, [axiosPublic]);

      return [menu, loading]

};

export default useMenu;